import React, { useEffect, useState } from 'react'
import PagesList from './PagesList'
import Page from './Page'
import ArticleForm from './ArticleForm'

// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [selectedPage, setSelectedPage] = useState(null)
  const [isAddingArticle, setIsAddingArticle] = useState(false)

  useEffect(() => {
    async function fetchPages () {
      try {
        const response = await fetch(`${apiURL}/wiki`)
        const pagesData = await response.json()
        setPages(pagesData)
      } catch (err) {
        console.log('Oh no an error! ', err)
      }
    }

    fetchPages()
  }, [])

  const fetchPageDetails = async (pageSlug) => {
    try {
      const response = await fetch(`${apiURL}/wiki/${pageSlug}`)
      const pageData = await response.json()
      setSelectedPage(pageData)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  };

  const handleSubmit = async (articleData) => {
    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });
      if (response.ok) {
        const updatedPages = await response.json();
        setPages([...pages, updatedPages]); // Update the state with the new article
        setIsAddingArticle(false); // Switch back to list view
      } else {
        console.log('Failed to add article');
      }
    } catch (err) {
      console.log('Oh no an error! ', err);
    }
  };

  const handleDeleteArticle = async (slug) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this article?');

      if (confirmDelete) {
        const response = await fetch(`${apiURL}/wiki/${slug}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          const updatedPages = await response.json();
          setPages(updatedPages);
          setSelectedPage(null);
        } else {
          console.log('Failed to delete article');
        }
      }
    } catch (err) {
      console.log('Oh no an error! ', err);
    }
  }

  return (
		<main>
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
      {isAddingArticle ? (
        <ArticleForm 
          onSubmit={handleSubmit} 
          onBack={() => setIsAddingArticle(false)} 
        />
      ) : !selectedPage ? (
        <>
        <button onClick={() => setIsAddingArticle(true)}>Add New Article</button> 
        <PagesList pages={pages} onViewDetails={fetchPageDetails} />
        </>
      ) : (
        <Page
          page={selectedPage}
          detailed={true}
          onBack={() => setSelectedPage(null)}
          onDelete={handleDeleteArticle}
        />
      )}
		</main>
  )
}

export default App;