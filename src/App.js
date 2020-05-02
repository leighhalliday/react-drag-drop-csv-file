import React from "react";
import { parse } from "papaparse";

export default function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [contacts, setContacts] = React.useState([
    { email: "fake@gmail.com", name: "Fake" },
  ]);

  return (
    <div>
      <h1 className="text-center text-4xl">Contact Import</h1>
      <div
        className={`p-6 my-2 mx-auto max-w-md border-2 ${
          highlighted ? "border-green-600 bg-green-100" : "border-gray-600"
        }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
              const text = await file.text();
              const result = parse(text, { header: true });
              setContacts((existing) => [...existing, ...result.data]);
            });
        }}
      >
        DROP HERE
      </div>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.email}>
            <strong>{contact.name}</strong>: {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
