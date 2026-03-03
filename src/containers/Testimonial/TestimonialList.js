import { createSelector } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteTestimonial,
  getList,
} from "../../store/reducer/testimonialReducer";
import { CSpinner } from "@coreui/react";
import TestimonialListTable from "../../components/MyTestimonials/TestimonialListTable";
import ARouteButton from "../../components/UI/ARouteButton";
import classes from "../home/Home.module.css";

const TestimonialList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapStateToProps = createSelector(
    [
      (state) => state.testimonialStore.testimonials,
      (state) => state.testimonialStore.refresh,
    ],
    (testimonials, refresh) => ({
      testimonials,
      refresh,
    })
  );
  const { testimonials, refresh } = useSelector(mapStateToProps);

  const onPageChangeHander = (page) => {
    if (page === null) return;
    dispatch(getList(setIsLoading, page));
  };

  useEffect(() => {
    dispatch(getList(setIsLoading));
  }, [refresh, dispatch]);
  let content = (
    <div className="ad-page-spinner">
      <CSpinner color="danger" />
    </div>
  );

  if (!isLoading) {
    content =
      testimonials && testimonials.data.length > 0 ? (
        <TestimonialListTable
          header={["#", "Name", "Title", "Rating", "Action"]}
          tableData={testimonials}
          onChange={onPageChangeHander}
          edit={(row) => {
            navigate(`/testimonials/update/${row.uuid}`);
          }}
          remove={(uuid) => dispatch(deleteTestimonial(uuid, navigate))}
        />
      ) : (
        <div className={classes.tableHeading}>
          <div>No Testimonial has been recorded Yet!!</div>
        </div>
      );
  }

  const onRoutePageHandler = () => {
    navigate("/testimonials/create");
  };
  return (
    <>
      <ARouteButton name="Create Testimonial" click={onRoutePageHandler} />
      {content}
    </>
  );
};

export default TestimonialList;
