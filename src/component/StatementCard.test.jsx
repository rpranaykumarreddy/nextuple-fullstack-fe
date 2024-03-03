import StatementCard from "./StatementCard";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {statementData} from "../Utils/testData";
describe('StatementCard', () => {
    test('renders the statement card with null', () => {
        render(<StatementCard data={null}/>);
    })
    test('renders the statement card with undefined', () => {
        render(<StatementCard data={undefined}/>);
    });
    test('renders the statement card with debit initiated', async () => {
        render(<StatementCard data={statementData.debits[0]}/>);
        const amount = screen.getByText("1000");
        const type = screen.getByText("Dr");
        const date = screen.getByText("28 Feb 2024");
        const to = screen.getByText("to: user2");
        expect(amount).toBeInTheDocument();
        expect(type).toHaveStyle("background: #1976d2");
        expect(date).toBeInTheDocument();
        expect(to).toBeInTheDocument();
        await userEvent.hover(type);
        const tip = await screen.findByRole('tooltip');
        expect(tip).toBeInTheDocument();
        expect(tip).toHaveTextContent("Debit Initiated");
    });
    test('renders the statement card with debit timeout', () => {
        render(<StatementCard data={statementData.debits[1]}/>);
    });
    test('renders the statement card with debit successful', () => {
        render(<StatementCard data={statementData.debits[2]}/>);
    });
    test('renders the statement card with debit cancelled', () => {
        render(<StatementCard data={statementData.debits[3]}/>);
    });
    test('renders the statement card with credit', () => {
        render(<StatementCard data={statementData.credits[0]}/>);
        const amount = screen.getByText("40000");
        const type = screen.getByText("Cr");
        const date = screen.getByText("27 Feb 2024");
        const from = screen.getByText("from: user2");
        expect(amount).toBeInTheDocument();
        expect(type).toHaveStyle("background: green");
        expect(date).toBeInTheDocument();
        expect(from).toBeInTheDocument();
    });
    test('renders the statement card with recharge', () => {
        render(<StatementCard data={statementData.recharges[0]}/>);
        const amount = screen.getByText("1000");
        const type = screen.getByText("Re");
        const date = screen.getByText("1 Mar 2024");
        const cashback = screen.getByText("cashback: 10");
        expect(amount).toBeInTheDocument();
        expect(type).toBeInTheDocument();
        expect(type).toHaveStyle("background: green");
        expect(date).toBeInTheDocument();
        expect(cashback).toBeInTheDocument();
    });
})