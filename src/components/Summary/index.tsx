import { useTheme } from "styled-components";
import { useTransactions } from "../../hooks/useTransactions";

import { priceFormatter } from "../../utils/formatter";

import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";

import { SummaryCard, SummaryContainer } from "./styles";

export function Summary() {
  const theme = useTheme();

  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.incomes += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcomes += transaction.price;
        acc.total -= transaction.price;
      }

      return acc;
    },
    {
      incomes: 0,
      outcomes: 0,
      total: 0,
    }
  );

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>

          <ArrowCircleUp size={32} color={theme["green-300"]} />
        </header>

        <strong>{priceFormatter.format(summary.incomes)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>

          <ArrowCircleDown size={32} color={theme["red-300"]} />
        </header>

        <strong>{priceFormatter.format(summary.outcomes)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>

          <CurrencyDollar size={32} color={theme.white} />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
