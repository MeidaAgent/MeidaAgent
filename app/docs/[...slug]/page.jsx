import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return [];
}

export default async function GenericDocPage() {
  redirect('/docs');
}
