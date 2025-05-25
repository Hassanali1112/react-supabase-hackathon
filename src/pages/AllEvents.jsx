import React, { useEffect, useState } from "react";
import { supabase } from "../lib/config";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, []);

  const handleAddParticipant = (eventId) => {
    alert(`Add participant to event ID: ${eventId}`);
  };

  const handleViewDetails = (eventId) => {
    navigate(`/user-dashboard/view-event/${eventId}`);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">All Events</h2>

      {events.length === 0 ? (
        <p className="text-center">No events found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {events.map((event) => {
            console.log(event.eventStatus)
            const isApproved = event.status === "approved";

            return (
              <div key={event.id} className="col">
                <div className="card h-100 shadow-sm">
                  {event.eventImage && (
                    <img
                      src={event.eventImage}
                      alt={event.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{event.eventName}</h5>
                    <p className="card-text mb-2">
                      <strong>Place:</strong> {event.eventPlace} <br />
                      <strong>Date:</strong> {event.eventDate} <br />
                      <strong>Time:</strong> {event.eventTime} <br />
                      <strong>Status: {event.eventStatus} </strong>{" "}
                      <span
                        className={`badge ${
                          isApproved ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {event.eventStatus}
                      </span>
                    </p>

                    <div className="mt-auto d-flex justify-content-between">
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={!isApproved}
                        onClick={() => handleAddParticipant(event.id)}
                      >
                        Add Participant
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleViewDetails(event.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
