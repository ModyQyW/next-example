import { Connector } from '@/constants';

declare global {
  type TWallet = keyof typeof Connector;
}

export {};
