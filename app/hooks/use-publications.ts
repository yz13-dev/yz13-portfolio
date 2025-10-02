import { Project } from "@/components/project-logo";
import { getStoreV1 } from "@yz13/api";
import { useEffect } from "react";
import { create } from "zustand";




type State = {
  publications: Project[];
  loading: boolean;
}

type Actions = {
  setPublications: (publications: Project[]) => void;
  setLoading: (loading: boolean) => void;
}

export const usePublicationsStore = create<State & Actions>()((set) => ({
  publications: [],
  loading: true,
  setPublications: (publications: Project[]) => set({ publications }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default function () {

  const loading = usePublicationsStore((state) => state.loading);
  const publications = usePublicationsStore((state) => state.publications);

  const setLoading = usePublicationsStore((state) => state.setLoading);
  const setPublications = usePublicationsStore((state) => state.setPublications);

  const load = async () => {
    setLoading(true);
    try {

      const publications = await getStoreV1();

      setPublications(publications);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load()
  }, [])
  return [publications, loading] as const;
}
