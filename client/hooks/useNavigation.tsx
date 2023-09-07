import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';
import { constants } from '@/common';
import { CategoryDto } from '@/features/category';

interface Options {
  sideFunc?: () => void;
  basePath?: string;
  tabs?: string[];
}

export const useNavigation = (options: Options) => {
  const { sideFunc, basePath, tabs } = options;

  const router = useRouter();

  const category = useMemo(() => router.pathname.split('/')[1], [router]);

  const defaultTab = useMemo(() => {
    const pathnameTab = router.pathname.split('/').at(-1);

    const tab = tabs?.findIndex((key: string) => key === pathnameTab) || 0;

    return tab > 0 ? tab : 0;
  }, [router]);

  const navigateCategory = useCallback(
    (key: string) => {
      sideFunc && sideFunc();
      router.push(`/${key}`);
    },
    [router]
  );

  const navigateTabs = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      if (!basePath) return;

      const key = tabs?.[newValue];

      if (key === 'posts') {
        router.push(`/${basePath}`);

        return;
      }

      router.push(`/${basePath}/${key}`);
    },
    [router]
  );

  return { category, navigateCategory, defaultTab, navigateTabs };
};
