import { BinaryCalculator } from './BinaryCalculator';
import { DecCalculator } from './DecCalculator';
import './style.scss';

$(() => {
  const bitCalc = new BinaryCalculator('.binary-calculator');
  const decCalc = new DecCalculator('.dec-calculator');
});