import React from 'react';
import { render, act, waitFor, screen } from '@testing-library/react';
import ShowPoints from '../components/ShowPoints';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import calculatePoints from '../utils/pointsCalculator';

jest.mock('../utils/pointsCalculator');

const mockData = [
    {
        id: '6464202a129c0ab6fead0ad9',
        userId: '6464202a55bebbe5c415d448',
        userName: 'Elsa Case',
        date: '2023-11-03',
        amount: 57.01,
    },
    {
        id: '6464202a1931d25e20d778f8',
        userId: '6464202a16183bf307546861',
        userName: 'Chan Norton',
        date: '2023-10-24',
        amount: 55.02,
    },
    {
        id: '6464202a1s31d25e20d778f8',
        userId: '6464202a16183bf307546861',
        userName: 'Chan Norton',
        date: '2023-09-24',
        amount: 55.03,
    },
    {
        id: '6464202a1s31d25e20d778f9',
        userId: '6464202a16183bf307546861',
        userName: 'Chan Norton',
        date: '2023-09-25',
        amount: 55.04,
    }
];

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

describe('ShowPoints', () => {
    let fetchMock;

    beforeEach(() => {
        fetchMock = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );
        global.fetch = fetchMock;
        calculatePoints.mockImplementation((() => 5));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    async function renderComponent() {
        await act(async () => {
            render(
                <Router>
                    <ShowPoints />
                </Router>
            );
        });
    }

    test('renders user details and monthly breakdown', async () => {
        useParams.mockReturnValue({ id: '6464202a16183bf307546861' });

        await renderComponent();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/transactions');

        await waitFor(() => {
            expect(screen.getByText('Hi, Chan Norton')).toBeInTheDocument();
            expect(screen.queryByText('Elsa Case')).toBeNull();

            expect(screen.getByText('September')).toBeInTheDocument();
            expect(screen.getByText('2023-09-24')).toBeInTheDocument();
            expect(screen.getByText('$55.02')).toBeInTheDocument();
            expect(screen.getByText('$55.03')).toBeInTheDocument();
            expect(screen.getByText('Monthly Total: 10 Points')).toBeInTheDocument();

            expect(screen.getByText('October')).toBeInTheDocument();
            expect(screen.getByText('2023-10-24')).toBeInTheDocument();
            expect(screen.getByText('$55.04')).toBeInTheDocument();
            expect(screen.getByText('Monthly Total: 5 Points')).toBeInTheDocument();

            expect(screen.getByText('Three Month Total: 15 Points')).toBeInTheDocument();
        });
    });
});