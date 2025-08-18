import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarPage() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        start: "",
        end: "",
        reminders: 0
    });

    // Ajouter un nouvel événement
    const handleAddEvent = (e) => {
        e.preventDefault();
        if (!newEvent.title || !newEvent.start || !newEvent.end) {
            alert("Merci de remplir au moins le titre, la date et l'heure !");
            return;
        }

        setEvents([
            ...events,
            {
                title: newEvent.title,
                description: newEvent.description,
                start: new Date(newEvent.start),
                end: new Date(newEvent.end),
                reminders: newEvent.reminders
            }
        ]);

        // Réinitialiser le formulaire
        setNewEvent({ title: "", description: "", start: "", end: "", reminders: 0 });
    };

    // Personnalisation affichage des événements
    const EventComponent = ({ event }) => (
        <span>
      <strong>{event.title}</strong>
      <br />
            {event.description && <em>{event.description}</em>}
            <br />
            {event.reminders > 0 && (
                <small>🔔 {event.reminders} rappel(s)</small>
            )}
    </span>
    );

    return (
        <div style={{ padding: "20px" }}>
            <h1>📅 Mon Calendrier</h1>

            {/* Formulaire ajout d'événement */}
            <form onSubmit={handleAddEvent} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Titre de l'événement"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    required
                    style={{ marginRight: "10px", padding: "5px" }}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    style={{ marginRight: "10px", padding: "5px" }}
                />
                <label>
                    Début :
                    <input
                        type="datetime-local"
                        value={newEvent.start}
                        onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                        required
                        style={{ margin: "0 10px" }}
                    />
                </label>
                <label>
                    Fin :
                    <input
                        type="datetime-local"
                        value={newEvent.end}
                        onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                        required
                        style={{ margin: "0 10px" }}
                    />
                </label>
                <label>
                    Rappels :
                    <input
                        type="number"
                        min="0"
                        value={newEvent.reminders}
                        onChange={(e) => setNewEvent({ ...newEvent, reminders: parseInt(e.target.value) })}
                        style={{ width: "60px", marginLeft: "5px" }}
                    />
                </label>
                <button type="submit" style={{ marginLeft: "10px" }}>Ajouter</button>
            </form>

            {/* Affichage du calendrier */}
            <div style={{ height: "600px" }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%" }}
                    components={{ event: EventComponent }}
                />
            </div>
        </div>
    );
}

export default CalendarPage;
