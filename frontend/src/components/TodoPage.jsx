// src/components/TodoPage.jsx
import React, { useState } from 'react';

function TodoPage() {
    const [lists, setLists] = useState([]);
    const [currentListIndex, setCurrentListIndex] = useState(null);

    const [listName, setListName] = useState('');
    const [period, setPeriod] = useState('');
    const [autoDelete, setAutoDelete] = useState(false);

    const [newTask, setNewTask] = useState('');

    // Validation période (jours/heures ou date YYYY-MM-DD)
    const isValidPeriod = (value) => {
        const regexDuration = /^(\d+\s*(jours?|heures?))$/i; // ex: "3 jours" ou "5 heures"
        const regexDate = /^\d{4}-\d{2}-\d{2}$/; // ex: 2025-08-15
        return regexDuration.test(value.trim()) || regexDate.test(value.trim());
    };

    // Créer une liste
    const handleCreateList = (e) => {
        e.preventDefault();

        if (!listName.trim()) {
            alert("⚠ Vous devez entrer un nom de liste.");
            return;
        }
        if (!period.trim()) {
            alert("⚠ Vous devez définir une période.");
            return;
        }
        if (!isValidPeriod(period)) {
            alert("⚠ La période doit être en jours/heures (ex: '3 jours') ou une date au format YYYY-MM-DD.");
            return;
        }

        const newList = {
            name: listName,
            period,
            autoDelete,
            tasks: []
        };
        setLists([...lists, newList]);
        setCurrentListIndex(lists.length);
        setListName('');
        setPeriod('');
        setAutoDelete(false);
    };

    // Ajouter une tâche
    const handleAddTask = () => {
        if (!newTask.trim()) return;
        const updatedLists = [...lists];
        updatedLists[currentListIndex].tasks.push({ text: newTask, done: false });
        setLists(updatedLists);
        setNewTask('');
    };

    // Marquer comme fait
    const toggleTask = (taskIndex) => {
        const updatedLists = [...lists];
        updatedLists[currentListIndex].tasks[taskIndex].done =
            !updatedLists[currentListIndex].tasks[taskIndex].done;
        setLists(updatedLists);
    };

    // Supprimer une tâche
    const deleteTask = (taskIndex) => {
        const updatedLists = [...lists];
        updatedLists[currentListIndex].tasks.splice(taskIndex, 1);
        setLists(updatedLists);
    };

    // Retour au formulaire
    const handleReturn = () => {
        setCurrentListIndex(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Choses à faire</h1>

            {currentListIndex === null ? (
                <>
                    <form onSubmit={handleCreateList} style={{ marginBottom: '20px' }}>
                        <label>
                            Nom de la liste :
                            <input
                                type="text"
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}
                                style={{ marginLeft: '10px' }}
                            />
                        </label>

                        <br /><br />

                        <label>
                            Période (ex: "3 jours", "5 heures" ou "2025-08-15") :
                            <input
                                type="text"
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                style={{ marginLeft: '10px' }}
                            />
                        </label>

                        <br /><br />

                        <label>
                            <input
                                type="checkbox"
                                checked={autoDelete}
                                onChange={(e) => setAutoDelete(e.target.checked)}
                            />
                            Supprimer automatiquement à la fin (facultatif)
                        </label>

                        <br /><br />
                        <button type="submit">Créer la liste</button>
                    </form>

                    {lists.length > 0 && (
                        <div>
                            <h2>Listes existantes :</h2>
                            <ul>
                                {lists.map((list, index) => (
                                    <li key={index}>
                                        <button onClick={() => setCurrentListIndex(index)}>
                                            {list.name} (Période : {list.period})
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>Changer de liste :</strong>
                        {lists.map((list, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentListIndex(index)}
                                style={{
                                    marginLeft: '10px',
                                    fontWeight: index === currentListIndex ? 'bold' : 'normal'
                                }}
                            >
                                {list.name}
                            </button>
                        ))}
                    </div>

                    <h2>{lists[currentListIndex].name}</h2>
                    <p>Période : {lists[currentListIndex].period}</p>

                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Nouvelle tâche..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <button onClick={handleAddTask}>Ajouter</button>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {lists[currentListIndex].tasks.map((task, index) => (
                            <li
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '5px',
                                    textDecoration: task.done ? 'line-through' : 'none',
                                    color: task.done ? 'gray' : 'black'
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => toggleTask(index)}
                                    style={{ marginRight: '10px' }}
                                />
                                <span style={{ flex: 1 }}>{task.text}</span>
                                <button
                                    onClick={() => deleteTask(index)}
                                    style={{
                                        marginLeft: '10px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={handleReturn}
                        style={{
                            marginTop: '20px',
                            backgroundColor: 'gray',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            cursor: 'pointer'
                        }}
                    >
                        ⬅ Retour au formulaire
                    </button>
                </>
            )}
        </div>
    );
}

export default TodoPage;
