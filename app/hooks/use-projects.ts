import { Project } from "@/components/project-logo";
import { getStoreV1 } from "@yz13/api";
import { useEffect } from "react";
import { create } from "zustand";




type State = {
  projects: Project[];
  loading: boolean;
}

type Actions = {
  setProjects: (projects: Project[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useProjectsStore = create<State & Actions>((set, get) => ({
  projects: [],
  loading: true,
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ loading }),
}))

export default function () {

  const projects = useProjectsStore((state) => state.projects);
  const loading = useProjectsStore((state) => state.loading);

  const setProjects = useProjectsStore((state) => state.setProjects);
  const setLoading = useProjectsStore((state) => state.setLoading);

  const load = async () => {
    setLoading(true)
    try {

      const projects = await getStoreV1();

      if (projects) setProjects(projects);


    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    load();
  }, [])
  return [projects, loading] as const;

}
