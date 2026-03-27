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

const safeGetPublicUser = () => getPublicUser().catch(() => null);
const safeGetAllProjects = () => getAllProjects().catch(() => []);
const safeGetAllSkills = () => getAllSkills().catch(() => []);
const safeGetAllApplications = () => getAllApplications().catch(() => []);

const QUERY_OPTIONS = {
  staleTime: 1000 * 60 * 60,       
  gcTime: 1000 * 60 * 60 * 2,      
  retry: 1,
  refetchOnWindowFocus: false,      
  refetchOnReconnect: false,        
  refetchOnMount: false,            
};

export const usePortfolioData = () => {
  const dispatch = useDispatch();

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
