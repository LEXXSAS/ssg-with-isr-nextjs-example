'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function revalidateForTagData(): Promise<void> {
  revalidateTag('todos');
  redirect('/');
}
export async function revalidateForAllPaths(): Promise<void> {
  revalidatePath('/');
  redirect('/');
}
