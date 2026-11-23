import { useState, useEffect } from "react";
import ContactCard from "./components/ContactCard";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  function handleAddContact(contactData) {
    const newContact = {
      id: Date.now(),
      ...contactData
    };

    setContacts([...contacts, newContact]);
  }

  function handleUpdateContact(id, updatedData) {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id
        ? { ...contact, ...updatedData }
        : contact
    );

    setContacts(updatedContacts);
    setEditingContact(null);
  }

  function handleDeleteContact(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (confirmDelete) {
      setContacts(contacts.filter((contact) => contact.id !== id));
    }
  }

  function handleEditContact(contact) {
    setEditingContact(contact);
  }

  function handleCancelEdit() {
    setEditingContact(null);
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.fullName.localeCompare(b.fullName);
    }

    return b.fullName.localeCompare(a.fullName);
  });

  return (
    <div className="app">
      <h1>My Contact List</h1>

      <ContactForm
        onAddContact={handleAddContact}
        editingContact={editingContact}
        onUpdateContact={handleUpdateContact}
        onCancelEdit={handleCancelEdit}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <div className="sort-section">
        <label>Sort contacts:</label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>

      <ContactList
        contacts={sortedContacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />

      {sortedContacts.length === 0 && (
        <p>No contacts found.</p>
      )}
    </div>
  );
}

export default App;
