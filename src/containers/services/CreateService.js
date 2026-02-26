import React from "react";
import ServiceForm from "../../components/services/ServiceForm";

const CreateService = () => {
  return (
    <>
      <ServiceForm />
      {/* {services.length > 0 &&
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
        ))} */}
    </>
  );
};
export default CreateService;
