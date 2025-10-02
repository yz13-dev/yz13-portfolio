import { getBlogV1Posts } from "@yz13/api";
import { GetBlogV1Posts200Item } from "@yz13/api/types";
import { useEffect } from "react";
import { create } from "zustand";


export type Blog = GetBlogV1Posts200Item;

type State = {
  blog: Blog[];
  loading: boolean;
}

type Actions = {
  setBlog: (blog: Blog[]) => void;
  setLoading: (loading: boolean) => void;
}


export const useBlogStore = create<State & Actions>()((set) => ({
  blog: [],
  loading: true,
  setBlog: (blog: Blog[]) => set({ blog }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default function () {

  const loading = useBlogStore((state) => state.loading);
  const blog = useBlogStore((state) => state.blog);

  const setLoading = useBlogStore((state) => state.setLoading);
  const setBlog = useBlogStore((state) => state.setBlog);

  const load = async () => {
    setLoading(true);
    try {

      const blog = await getBlogV1Posts();

      setBlog(blog);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load()
  }, [])
  return [blog, loading] as const;
}
