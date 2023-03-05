import { useEffect, useState } from 'react';
import type { ReleaseResponse } from '../../../pages/api/releases';
import ReleaseCard from './ReleaseCard';
import ReleaseSkeleton from './ReleaseSkeleton';
import UpstreamCard from './UpstreamCard';

export default function ReleasesPage() {
  const [releaseResponse, setReleaseResponse] = useState<ReleaseResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/releases');
      let data: ReleaseResponse = await res.json();

      setReleaseResponse(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <ReleaseSkeleton />
      ) : releaseResponse?.upstream.commit ? (
        <UpstreamCard commit={releaseResponse.upstream.commit} runs={releaseResponse.upstream.checkRuns} />
      ) : (
        <ReleaseSkeleton />
      )}

      {loading
        ? Array(10)
            .fill(0)
            .map((_, i) => <ReleaseSkeleton key={i} />)
        : releaseResponse?.releases.map((release) => <ReleaseCard key={release.id} release={release} />)}
    </>
  );
}
