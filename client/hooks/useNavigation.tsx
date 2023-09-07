import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';
import { constants } from '@/common';
import { CategoryDto } from '@/features/category';

interface Options {
  sideFunc?: () => void;
  pageCategory?: CategoryDto;
}

export const useNavigation = (options: Options) => {
  const { sideFunc, pageCategory } = options;

  const router = useRouter();

  const category = useMemo(() => router.pathname.split('/')[1], [router]);

  const defaultTab = useMemo(() => {
    const pathnameTab = router.pathname.split('/').at(-1);

    const tab = constants.CATEGORY_TABS.findIndex((key: string) => key === pathnameTab);

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
      if (!pageCategory) return;

      const key = constants.CATEGORY_TABS[newValue];

      if (key === 'posts') {
        router.push(`/${pageCategory.key}`);

        return;
      }

      router.push(`/${pageCategory.key}/${key}`);
    },
    [router]
  );

  return { category, navigateCategory, defaultTab, navigateTabs };
};
