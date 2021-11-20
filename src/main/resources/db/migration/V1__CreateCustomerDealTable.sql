CREATE TABLE IF NOT EXISTS CustomerDeal (
    CustomerDealID UUID PRIMARY KEY NOT NULL,
    FromCurrency VARCHAR(100) NOT NULL,
    ToCurrency VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Dealtimestamp time NOT NULL
    DealAmount double NOT NULL
);

