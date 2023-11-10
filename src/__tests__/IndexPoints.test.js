import React from 'react';
import { render, act, waitFor, screen } from '@testing-library/react';
import IndexPoints from '../components/IndexPoints';
import { BrowserRouter as Router } from 'react-router-dom';
import calculatePoints from '../utils/pointsCalculator';

jest.mock('../utils/pointsCalculator');

const mockData = [
    {
        id: '6464202a129c0ab6fead0ad9',
        userId: '6464202a55bebbe5c415d448',
        userName: 'Elsa Case',
        date: '2023-08-03',
        amount: 57.85,
    },
    {
        id: '6464202a1931d25e20d778f8',
        userId: '6464202a16183bf307546861',
        userName: 'Chan Norton',
        date: '2023-10-24',
        amount: 55.74,
    },
    {
        id: '6464202a1s31d25e20d778f8',
        userId: '6464202a16183bf307546861',
        userName: 'Chan Norton',
        date: '2023-09-24',
        amount: 55.84,
    }
];

describe('Index Points', () => {
    let fetchMock;

    beforeEach(() => {
        fetchMock = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );
        global.fetch = fetchMock;
        calculatePoints.mockImplementation(() => 5);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    async function renderComponent() {
        await act(async () => {
            render(
                <Router>
                    <IndexPoints />
                </Router>
            );
        });
    }

    test('loads transactions and people within three months', async () => {
        await renderComponent();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/transactions');

        await waitFor(() => {
            expect(screen.getByText('Total Points')).toBeInTheDocument();
            expect(screen.queryByText('Elsa Case')).toBeNull();
            expect(screen.getByText('Chan Norton')).toBeInTheDocument();
            //total points for user Chan Norton
            expect(screen.getByText('10')).toBeInTheDocument();
        });
    });

    test('renders link to user details', async () => {
        await renderComponent();

        await waitFor(() => {
            const link = screen.getByText('Chan Norton');
            expect(link).toBeInTheDocument();
            expect(link.getAttribute('href')).toBe('/show-points/6464202a16183bf307546861');
        });
    });

    test('renders correct table headers', async () => {
        await renderComponent();

        await waitFor(() => {
            const headers = screen.getAllByRole('columnheader');
            expect(headers).toHaveLength(2);
            expect(headers[0]).toHaveTextContent('Name');
            expect(headers[1]).toHaveTextContent('Three Month Total');
        });
    });
});