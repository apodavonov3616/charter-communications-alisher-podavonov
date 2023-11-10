import React from 'react';
import { render, act, waitFor, screen } from '@testing-library/react';
import Transactions from '../components/Transactions';
import { BrowserRouter as Router } from 'react-router-dom';
import threeMonthFilter from '../utils/filterPriorMonths';

jest.mock('../utils/filterPriorMonths');

const mockData = [
    {
        id: '6464202a129c0ab6fead0ad9',
        userId: '6464202a55bebbe5c415d448',
        userName: 'Elsa Case',
        date: '2023-02-03',
        amount: 55.01,
    },
    {
        id: '6464202a1931d25e20d778f8',
        userId: '6464202a16183bf307546861',
        userName: 'Chan Norton',
        date: '2023-04-24',
        amount: 55.02,
    },
    {
        id: '6464202a1s31d25e20d778f8',
        userId: '6464202a16183bf307546861',
        userName: 'Chan Norton',
        date: '2023-03-24',
        amount: 55.03,
    }
];

describe('Transactions', () => {
    let fetchMock;

    beforeEach(() => {
        fetchMock = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );
        global.fetch = fetchMock;
        threeMonthFilter.mockImplementation(data => data);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    async function renderComponent() {
        await act(async () => {
            render(
                <Router>
                    <Transactions />
                </Router>
            );
        });
    }

    test('loads and displays transactions', async () => {
        await renderComponent();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/transactions');

        await waitFor(() => {
            expect(screen.getByText('Transactions')).toBeInTheDocument();
            expect(screen.getByText('Elsa Case')).toBeInTheDocument();
            expect(screen.getByText('$55.01')).toBeInTheDocument();
            expect(screen.getByText('$55.02')).toBeInTheDocument();
            expect(screen.getByText('$55.03')).toBeInTheDocument();
        });
    });

    test('renders link to user details', async () => {
        await renderComponent();

        await waitFor(() => {
            const links = screen.getAllByText('Chan Norton');
            expect(links).toHaveLength(2);
        
            //test if link works properly
            const link = links[0];
            expect(link).toBeInTheDocument();
            expect(link.getAttribute('href')).toBe('/show-points/6464202a16183bf307546861');
        });
    });

    test('renders correct table headers', async () => {
        await renderComponent();

        await waitFor(() => {
            const headers = screen.getAllByRole('columnheader');
            expect(headers).toHaveLength(3);
            expect(headers[0]).toHaveTextContent('Name');
            expect(headers[1]).toHaveTextContent('Date');
            expect(headers[2]).toHaveTextContent('Amount');
        });
    });
});