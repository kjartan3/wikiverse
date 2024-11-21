import React from "react";

const Page = ({ page, detailed, onViewDetails, onBack, onDelete }) => {
  if (detailed) {
    // Show detailed view
    return (
      <div>
        <h2>{page.title}</h2>
        <p><strong>Author:</strong> {page.author?.name || "Unknown"}</p>
        <p><strong>Content:</strong> {page.content}</p>
        <p><strong>Status:</strong> {page.status}</p>
        <p><strong>Tags:</strong> {page.tags?.map(tag => tag.name).join(", ") || "No tags"}</p>
        <p><strong>Date:</strong> {new Date(page.createdAt).toLocaleDateString()}</p>
        <button onClick={onBack}>Back to List</button>
        <button onClick={() => onDelete(page.slug)}>Delete</button>
      </div>
    );
  }

  // Show default list view
  return (
    <li>
      <h3>{page.title}</h3>
      <p>{page.content.substring(0, 100)}...</p> {/* Show a preview of content */}
      <p><strong>Status:</strong> {page.status}</p>
      <p><strong>Author:</strong> {page.author}</p>
      <button onClick={() => onViewDetails(page.slug)}>View Details</button>
    </li>
  );
};

export default Page;
