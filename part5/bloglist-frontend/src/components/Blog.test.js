import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {

  let component

  const blog = {
    'likes': 8,
    'title': 'React patterns',
    'author': 'Michael Chan',
    'url': 'https://reactpatterns.com/',
    'user': {
      'username': 'uniqueUser',
      'name': 'testUser',
      'id': '6109a006ad7222a2c524cb7f'
    },
    'id': '610a96688a457e5791606621'
  }

  const user = {
    'username': 'uniqueUser',
    'name': 'testUser',
    'id': '6109a006ad7222a2c524cb7f'
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} updateLikes={mockHandler} />
    )
  })


  test('<Blog /> renders the blog\'s title and author but not url and likes', () => {

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('<Blog /> url and number of likes are shown when the button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('<Blog />, if the like button is clicked twice, the event handler is called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})