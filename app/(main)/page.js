import Hero from '@/components/Hero';
import MetricsBanner from '@/components/MetricsBanner';
import MeetAgent from '@/components/MeetAgent';
import PilotRouter from '@/components/PilotRouter';
import Surfaces from '@/components/Surfaces';
import Capabilities from '@/components/Capabilities';
import SchemaProviders from '@/components/SchemaProviders';
import DesktopAppTeaser from '@/components/DesktopAppTeaser';
import Install from '@/components/Install';
import NetworkBackground from '@/components/NetworkBackground';

export default function Home() {
  return (
    <main>
      <NetworkBackground />
      <Hero />
      <MetricsBanner />
      <MeetAgent />
      <PilotRouter />
      <Surfaces />
      <Capabilities />
      <SchemaProviders />
      <DesktopAppTeaser />
      <Install />
    </main>
  );
}
