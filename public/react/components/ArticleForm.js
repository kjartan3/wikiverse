import React, { useState } from 'react';

const ArticleForm = ({ onSubmit, onBack }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const articleData = {
      title,
      content,
      name: authorName,
      email: authorEmail,
      tags: tags.trim(), // Ensure tags are a single string
    };
    onSubmit(articleData); // Call the onSubmit function passed as a prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Article</h3>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Author Name:
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Author Email:
        <input
          type="email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Tags (separated by spaces):
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tag1 tag2 tag3"
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={onBack}>Back</button>
    </form>
  );
};

export default ArticleForm;