import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/config";
import { Spinner, Alert } from "react-bootstrap";

const dummyEvent = {
  id: 0,
  name: "Sample Tech Meetup",
  place: "Virtual Conference Room",
  date: "2025-07-20",
  time: "17:00",
  status: "pending",
  description: "This is a placeholder event used when data is unavailable.",
};

const ViewEvent = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          console.warn("Falling back to dummy event data");
          setEvent(dummyEvent);
        } else {
          setEvent(data);
        }
      } catch (err) {
        setError("Failed to fetch event");
        setEvent(dummyEvent);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3 text-center">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">{event.name}</h2>
        <p>
          <strong>Location:</strong> {event.place}
        </p>
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Time:</strong> {event.time}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`badge ${
              event.status === "approved"
                ? "bg-success"
                : "bg-warning text-dark"
            }`}
          >
            {event.status}
          </span>
        </p>
        {event.description && (
          <p className="mt-3">
            <strong>Description:</strong> {event.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewEvent;
