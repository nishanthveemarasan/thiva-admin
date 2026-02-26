import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProject, getList } from "../../../store/reducer/projectReducer";
import { createSelector } from "@reduxjs/toolkit";
import { CSpinner } from "@coreui/react";
import ProjectListTable from "../../../components/MyProjects/ProjectListTable";
import classes from "../Home.module.css";
import { projectStoreActions } from "../../../store/store";
import ARouteButton from "../../../components/UI/ARouteButton";
const MyProjectList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapStateToProps = createSelector(
    [
      (state) => state.projectStore.projects,
      (state) => state.projectStore.refresh,
    ],
    (projects, refresh) => ({
      projects, refresh
    })
  );

  const { projects, refresh } = useSelector(mapStateToProps);
  useEffect(() => {
    dispatch(getList(setIsLoading));
  }, [refresh, dispatch]);


  let content = (
    <div className="ad-page-spinner">
      <CSpinner color="danger" />
    </div>
  );

  const onPageChangeHander = (page) => {
    if (page === null) return;
    dispatch(getList(setIsLoading, page));
  };

  if (!isLoading) {
      content =
        projects?.data && projects.data.length > 0 ? (
          <ProjectListTable
            header={["#", "Name", "Type", "City", "Action"]}
            tableData={projects}
            onChange={onPageChangeHander}
            edit={(row) => {
              navigate(`/projects/update/${row.uuid}`);
            }}
            remove={(uuid) => dispatch(deleteProject(uuid, navigate))}
          />
        ) : (
          <div className={classes.tableHeading}>
            <div>No project has been recorded Yet!!</div>
          </div>
        );
    }
  
    const onRoutePageHandler = () => {
        navigate("/projects/create");
      };

  return (
    <div>
        <ARouteButton name="Create Project" click={onRoutePageHandler} />
      {content}
    </div>
  );
};
export default MyProjectList;
