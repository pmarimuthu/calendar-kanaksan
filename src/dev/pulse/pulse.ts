// Direct port of pulse.kanaksan.com src/services/pulse.js — the Firestore
// document shapes here are exactly what the pulse-kanaksan security rules
// expect. Do not change field names or write patterns.
import {
  doc, getDoc, setDoc, updateDoc,
  increment, serverTimestamp, onSnapshot,
  collection,
} from 'firebase/firestore';
import { db } from './firebase';

const VISITORS = 'visitors';
const PROJECTS = 'projects';

export interface ProjectStats {
  total: number;
  unique: number;
  todayCount: number;
  todayDate: string;
}

export interface PageStats {
  pageKey: string;
  context: Record<string, unknown>;
  total: number;
  unique: number;
}

export interface VisitContext extends Record<string, unknown> {
  fingerprintId?: string;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function recordVisit(
  projectId: string,
  pageKey: string | null,
  context: VisitContext = {},
): Promise<void> {
  const fingerprintId = context.fingerprintId;
  if (!fingerprintId || !projectId) return;

  const today = todayISO();
  const visitorRef = doc(db, VISITORS, fingerprintId);
  const visitorSnap = await getDoc(visitorRef);
  const isNewGlobal = !visitorSnap.exists();

  if (isNewGlobal) {
    await setDoc(visitorRef, { firstSeen: serverTimestamp(), lastSeen: serverTimestamp() });
  } else {
    await updateDoc(visitorRef, { lastSeen: serverTimestamp() });
  }

  const pvRef = doc(db, VISITORS, fingerprintId, PROJECTS, projectId);
  const pvSnap = await getDoc(pvRef);
  const isNewToProject = !pvSnap.exists();

  if (isNewToProject) {
    await setDoc(pvRef, { firstSeen: serverTimestamp(), lastSeen: serverTimestamp() });
  } else {
    await updateDoc(pvRef, { lastSeen: serverTimestamp() });
  }

  const statsRef = doc(db, PROJECTS, projectId, 'stats', 'global');
  const statsSnap = await getDoc(statsRef);

  if (!statsSnap.exists()) {
    await setDoc(statsRef, {
      total: 1,
      unique: isNewToProject ? 1 : 0,
      todayCount: 1,
      todayDate: today,
    });
  } else {
    const data = statsSnap.data() as ProjectStats;
    const isSameDay = data.todayDate === today;
    await updateDoc(statsRef, {
      total: increment(1),
      unique: isNewToProject ? increment(1) : increment(0),
      todayCount: isSameDay ? increment(1) : 1,
      todayDate: today,
    });
  }

  if (!pageKey) return;

  const pageRef = doc(db, PROJECTS, projectId, 'pages', pageKey);
  const ppRef = doc(db, VISITORS, fingerprintId, PROJECTS, projectId, 'pages', pageKey);
  const ppSnap = await getDoc(ppRef);
  const isNewToPage = !ppSnap.exists();

  if (isNewToPage) {
    await setDoc(ppRef, { firstSeen: serverTimestamp(), lastSeen: serverTimestamp() });
  } else {
    await updateDoc(ppRef, { lastSeen: serverTimestamp() });
  }

  const pageSnap = await getDoc(pageRef);
  if (!pageSnap.exists()) {
    await setDoc(pageRef, {
      pageKey,
      context,
      total: 1,
      unique: isNewToPage ? 1 : 0,
    });
  } else {
    await updateDoc(pageRef, {
      total: increment(1),
      unique: isNewToPage ? increment(1) : increment(0),
    });
  }
}

export function subscribeStats(
  projectId: string,
  callback: (stats: ProjectStats | null) => void,
): () => void {
  const ref = doc(db, PROJECTS, projectId, 'stats', 'global');
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? (snap.data() as ProjectStats) : null);
  });
}

export function subscribePageStats(
  projectId: string,
  pageKey: string,
  callback: (stats: PageStats | null) => void,
): () => void {
  const ref = doc(db, PROJECTS, projectId, 'pages', pageKey);
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? (snap.data() as PageStats) : null);
  });
}

export function subscribeAllPages(
  projectId: string,
  callback: (pages: PageStats[]) => void,
): () => void {
  const ref = collection(db, PROJECTS, projectId, 'pages');
  return onSnapshot(ref, (snap) => {
    callback(snap.docs.map((d) => d.data() as PageStats));
  });
}
