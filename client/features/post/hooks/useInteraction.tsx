import { useToast } from '@/features/toast';
import { ApiService } from '@/services';
import { PostItem } from '@/types';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export const useInteraction = (post: PostItem) => {
  const { toastError, toast } = useToast();

  const router = useRouter();

  const [like, setLike] = useState({ isLiked: !!post?.isLiked, count: post.stats.likes });
  const [dislike, setDislike] = useState({
    isDisliked: !!post?.isDisliked,
    count: post.stats.dislikes,
  });
  const [subscribed, setSubscribed] = useState(!!post?.isSubscribed);

  const handleLike = useCallback(async () => {
    setLike((prev) => ({
      isLiked: !prev.isLiked,
      count: prev.isLiked ? prev.count - 1 : prev.count + 1,
    }));
    try {
      await ApiService.post.like(+post.id);
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, 'error');
      }
      setLike(like);
    }
  }, [like]);

  const handleDislike = useCallback(async () => {
    setDislike((prev) => ({
      isDisliked: !prev.isDisliked,
      count: prev.isDisliked ? prev.count - 1 : prev.count + 1,
    }));
    try {
      await ApiService.post.dislike(+post.id);
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, 'error');
      }
      setDislike(dislike);
    }
  }, [dislike]);

  const handleSubscribe = useCallback(async () => {
    setSubscribed((prev) => !prev);
    try {
      await ApiService.post.subscribe(post.category);
      router.reload();
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, 'error');
      }
      setSubscribed(subscribed);
    }
  }, [like]);

  const handleShare = useCallback(() => {
    const url = `${window.location.toString()}${post.category}/${post.id}`;
    navigator.clipboard.writeText(url);
    toast('copy_clipboard', 'success');
  }, [post]);

  return { like, handleLike, subscribed, handleSubscribe, handleShare, dislike, handleDislike };
};
