import React, { useState } from "react";
import { supabase } from "../lib/config";

const NewEventForm = () => {
  const [form, setForm] = useState({
    name: "",
    place: "",
    date: "",
    time: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!form.name.trim()) newErrors.name = "Event name is required.";
    if (!form.place.trim()) newErrors.place = "Event place is required.";
    if (!form.date) newErrors.date = "Event date is required.";
    else if (form.date < today)
      newErrors.date = "Event date cannot be in the past.";
    if (!form.time) newErrors.time = "Event time is required.";
    if (!form.image) newErrors.image = "Event image is required.";
    else if (!form.image.type.startsWith("image/"))
      newErrors.image = "Only image files are allowed.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // ✅ Step 1: Check if the event already exists
      const { data: existingEvent, error: checkError } = await supabase
        .from("events")
        .select("*")
        .eq("eventName", form.name.trim())
        .eq("eventPlace", form.place.trim())
        .eq("eventDate", form.date);

      if (checkError) throw checkError;

      if (existingEvent.length > 0) {
        alert("❌ Event already exists!");
        setLoading(false);
        return;
      }

      // ✅ Step 2: Upload image to Supabase Storage
      const fileExt = form.image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("event-bucket")
        .upload(fileName, form.image);

      if (uploadError) throw uploadError;

      const { data: imageData } = supabase.storage
        .from("event-bucket")
        .getPublicUrl(fileName);

      const imageUrl = imageData.publicUrl;

      // ✅ Step 3: Insert new event
      const { error: insertError } = await supabase.from("events").insert([
        {
          eventName: form.name.trim(),
          eventPlace: form.place.trim(),
          eventDate: form.date,
          eventTime: form.time,
          eventImage: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert("✅ Event submitted successfully!");

      setForm({
        name: "",
        place: "",
        date: "",
        time: "",
        image: null,
      });
    } catch (err) {
      console.error("❌ Error submitting event:", err.message);
      alert("Error submitting event. Check console for details.");
    } finally {
      setLoading(false);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   setLoading(true);

  //   try {
  //     // Upload image to Supabase bucket
  //     const fileExt = form.image.name.split(".").pop();
  //     const fileName = `${Date.now()}.${fileExt}`;
  //     console.log(fileName)

  //     const { error: uploadError } = await supabase.storage
  //       .from("event-bucket")
  //       .upload(fileName, form.image);

  //     if (uploadError) throw uploadError;

  //     const { data: imageData } = supabase.storage
  //       .from("event-bucket")
  //       .getPublicUrl(fileName);

  //     const imageUrl = imageData.publicUrl;
  //     console.log(form.time)

  //     // Insert event into Supabase table
  //     const { error: insertError } = await supabase.from("events").insert([
  //       {
  //       eventName: form.name,
  //         eventPlace: form.place,
  //         eventDate: form.date,
  //         eventTime: form.time,
  //         eventImage: imageUrl,
  //       },
  //     ]);

  //     if (insertError) throw insertError;

  //     alert("✅ Event submitted successfully!");
  //     console.log("📦 Saved to Supabase:", {
  //       ...form,
  //       image_url: imageUrl,
  //     });

  //     setForm({
  //       name: "",
  //       place: "",
  //       date: "",
  //       time: "",
  //       image: null,
  //     });
  //   } catch (err) {
  //     console.error("❌ Error submitting event:", err.message);
  //     alert("Error submitting event. Check console for details.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h4 className="mb-4 text-center">Submit New Event</h4>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={form.name}
              onChange={handleChange}
              placeholder="Enter event name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="place" className="form-label">
              Event Place
            </label>
            <input
              type="text"
              id="place"
              name="place"
              className={`form-control ${errors.place ? "is-invalid" : ""}`}
              value={form.place}
              onChange={handleChange}
              placeholder="Enter event location"
            />
            {errors.place && (
              <div className="invalid-feedback">{errors.place}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Event Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className={`form-control ${errors.date ? "is-invalid" : ""}`}
              value={form.date}
              onChange={handleChange}
            />
            {errors.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Event Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              className={`form-control ${errors.time ? "is-invalid" : ""}`}
              value={form.time}
              onChange={handleChange}
            />
            {errors.time && (
              <div className="invalid-feedback">{errors.time}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="form-label">
              Event Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
              accept="image/*"
              onChange={handleChange}
            />
            {errors.image && (
              <div className="invalid-feedback">{errors.image}</div>
            )}
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEventForm;
