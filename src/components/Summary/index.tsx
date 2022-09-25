import { useTheme } from "styled-components";
import { useSummary } from "../../hooks/useSummary";

import { priceFormatter } from "../../utils/formatter";

import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";

import { SummaryCard, SummaryContainer } from "./styles";

export function Summary() {
  const theme = useTheme();

  const { incomes, outcomes, total } = useSummary();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>

          <ArrowCircleUp size={32} color={theme["green-300"]} />
        </header>

        <strong>{priceFormatter.format(incomes)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>

          <ArrowCircleDown size={32} color={theme["red-300"]} />
        </header>

        <strong>{priceFormatter.format(outcomes)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>

          <CurrencyDollar size={32} color={theme.white} />
        </header>

        <strong>{priceFormatter.format(total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
