import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('It should make a successful call to the api when the component mounts', async () => {
  const mockSuccessResponse: any = [];
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  render(<Home />);
  
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/topstories.json');
});
