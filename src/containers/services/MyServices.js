import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ServiceForm from "../../components/services/ServiceForm";
import AIcon from "../../components/UI/AIcon";
import { cilTrash } from "@coreui/icons";
import { serviceStoreActions } from "../../store/store";
import ACard from "../../components/UI/ACard";

const MyServices = () => {
  const mapStateToProps = createSelector(
    [(state) => state.serviceStore.services],
    (services) => ({
      services,
    })
  );
  const { services } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const onDeleteServiceHandler = (index) => {
    dispatch(serviceStoreActions.removeService(index));
  };

  return (
    <>
      <ServiceForm />
      {services.length > 0 &&
        services.map((service, index) => (
          <div key={index} className="p-3 mb-1 col-12 col-md-6">
            <ACard
              title={
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{service.title}</h5>
                  <div>
                    <div className="flex items-center">
                      <AIcon
                        icon={cilTrash}
                        className="me-2"
                        click={() => onDeleteServiceHandler(index)}
                      />
                    </div>
                  </div>
                </div>
              }
            >
             <div>
                <p className="mb-1"><span className="fw-bold">Description: </span>{service.description}</p>
                <p className="mb-1"> <span className="fw-bold">Special Point: </span>{service.special_point}</p>
                <div>
                    <h6>Points</h6>
                    <ul>
                        {service.points.map((point, pointIndex) => (
                            <li key={pointIndex}>{point}</li>
                        ))}
                    </ul>
                </div>
             </div>
            </ACard>
          </div>
        ))}
    </>
  );
};
export default MyServices;
