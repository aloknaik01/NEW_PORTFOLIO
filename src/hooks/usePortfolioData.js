import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {
  getPublicUser,
  getAllProjects,
  getAllSkills,
  getAllApplications
} from "../api/portfolioApi";
import { setPortfolioData } from "../store/slices/portfolioSlice";

// Stable fetcher references — defined outside hook so they never change between renders
const safeGetPublicUser = () => getPublicUser().catch(() => null);
const safeGetAllProjects = () => getAllProjects().catch(() => []);
const safeGetAllSkills = () => getAllSkills().catch(() => []);
const safeGetAllApplications = () => getAllApplications().catch(() => []);

// Shared React Query options — data stays "fresh" for 1 hour so navigating
// between pages NEVER triggers a new network request.
const QUERY_OPTIONS = {
  staleTime: 1000 * 60 * 60,       // 1 hour — data is treated as fresh
  gcTime: 1000 * 60 * 60 * 2,      // 2 hours — keep in React Query in-memory cache
  retry: 1,
  refetchOnWindowFocus: false,      // Don't re-fetch when tab regains focus
  refetchOnReconnect: false,        // Don't re-fetch on network reconnect
  refetchOnMount: false,            // Don't re-fetch when component re-mounts
};

export const usePortfolioData = () => {
  const dispatch = useDispatch();
  // Guard ref: syncs to Redux only once when all data arrives
  const hasSynced = useRef(false);

  const userQuery = useQuery({ queryKey: ["user"], queryFn: safeGetPublicUser, ...QUERY_OPTIONS });
  const projectsQuery = useQuery({ queryKey: ["projects"], queryFn: safeGetAllProjects, ...QUERY_OPTIONS });
  const skillsQuery = useQuery({ queryKey: ["skills"], queryFn: safeGetAllSkills, ...QUERY_OPTIONS });
  const appsQuery = useQuery({ queryKey: ["apps"], queryFn: safeGetAllApplications, ...QUERY_OPTIONS });

  const isLoading =
    userQuery.isLoading ||
    projectsQuery.isLoading ||
    skillsQuery.isLoading ||
    appsQuery.isLoading;

  const isError = userQuery.isError && projectsQuery.isError;

  useEffect(() => {
    if (!isLoading && !hasSynced.current) {
      hasSynced.current = true;
      dispatch(setPortfolioData({
        user: userQuery.data ?? null,
        projects: projectsQuery.data ?? [],
        skills: skillsQuery.data ?? [],
        applications: appsQuery.data ?? [],
      }));
    }
  }, [
    isLoading,
    userQuery.data,
    projectsQuery.data,
    skillsQuery.data,
    appsQuery.data,
    dispatch,
  ]);

  return {
    user: userQuery.data ?? null,
    projects: projectsQuery.data ?? [],
    skills: skillsQuery.data ?? [],
    applications: appsQuery.data ?? [],
    isLoading,
    isError,
  };
};
