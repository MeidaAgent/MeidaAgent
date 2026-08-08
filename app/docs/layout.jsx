import DocsSidebar from '@/components/DocsSidebar';
import DocsNavbar from '@/components/DocsNavbar';

export const metadata = {
  title: 'Documentation · Meida Agent',
  description: 'Documentation for Meida Agent',
};

export default function DocsLayout({ children }) {
  return (
    <>
      <DocsNavbar />
      <div className="min-h-screen bg-[#050505] flex">
        <DocsSidebar />
        <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-16 pt-28 pb-24 overflow-x-hidden">
          <div className="max-w-[800px]">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
