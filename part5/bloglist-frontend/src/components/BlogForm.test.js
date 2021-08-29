import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component

  const mockBlog = {
    'title': 'React patterns',
    'author': 'Michael Chan',
    'url': 'https://reactpatterns.com/'
  }

  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm
        createBlog={createBlog} />
    )
  })

  test('<BlogForm /> form submission calls event handler with the right details', async () => {
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'React patterns' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'Michael Chan' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'https://reactpatterns.com/' }
    })

    fireEvent.submit(form)

    await waitFor(() => {
      expect(createBlog.mock.calls).toHaveLength(1)
      expect(createBlog.mock.calls[0][0]).toEqual(mockBlog)
    })
  })
})