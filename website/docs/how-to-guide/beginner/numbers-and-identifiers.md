---
sidebar_label: "Numbers and Identifiers"
sidebar_position: 3
---

# Numbers and Identifiers

Three things are the same everywhere on Cardano and different from what beginners expect: how amounts are written, how a token is named, and how an address says which network it lives on. Each one is arithmetic or string parsing, so this page lets you try them instead of reading about them.

Nothing here needs a wallet, a provider key or a node.

## 1. Amounts are whole numbers

Cardano has one currency unit in the ledger: the lovelace. One ADA is one million lovelace, and every quantity you send, hold or read is an integer count of lovelace. There is no decimal number anywhere in the protocol, which means the rounding you see in a wallet happens in the wallet.

Edit the amount:

```jsx live
function Lovelace() {
  const [ada, setAda] = React.useState(1.5);
  const lovelace = Math.round(ada * 1e6);

  return (
    <div style={{ fontSize: 14, lineHeight: 1.9 }}>
      <label>
        ADA{' '}
        <input
          type="number"
          step="0.000001"
          value={ada}
          onChange={(e) => setAda(Number(e.target.value))}
          style={{ width: 120, padding: '2px 6px' }}
        />
      </label>
      <div style={{ marginTop: 8 }}>
        lovelace: <code>{String(lovelace)}</code>
      </div>
      <div style={{ color: '#5a5a5a' }}>
        smallest unit you can actually send: <code>1</code> lovelace, which is 0.000001 ADA
      </div>
    </div>
  );
}
```

The trap is `0.1 + 0.2` in JavaScript. Doing arithmetic in ADA and multiplying at the last moment is fine; doing arithmetic in ADA and *comparing* the results is not. Convert to lovelace first, keep integers, and format for display only.

## 2. Every token has a unit

ADA is named `lovelace`. Anything else is named by two strings joined with no separator: the policy ID which is the script that mints it, and the asset name encoded as hex.

```jsx live
function Unit() {
  const [policyId, setPolicyId] = React.useState(
    '86a9c2c1cf0e1b3b7d5e6c1b9f3f0f2b1c8a4b1a2c3d4e5f6a7b8c9d'
  );
  const [name, setName] = React.useState('TOKEN');

  const hex = [...new TextEncoder().encode(name)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const unit = policyId + hex;

  const policyOk = /^[0-9a-fA-F]{56}$/.test(policyId);

  return (
    <div style={{ fontSize: 14, lineHeight: 1.9 }}>
      <label style={{ display: 'block' }}>
        policy ID{' '}
        <input
          value={policyId}
          onChange={(e) => setPolicyId(e.target.value.trim())}
          style={{ width: '100%', maxWidth: 520, padding: '2px 6px', fontFamily: 'monospace' }}
        />
      </label>
      <div style={{ color: policyOk ? '#0a7c42' : '#c13a0b', marginBottom: 8 }}>
        {policyOk ? '56 hex characters, the right length' : 'a policy ID is 56 hex characters (28 bytes)'}
      </div>
      <label style={{ display: 'block' }}>
        asset name{' '}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: 180, padding: '2px 6px' }}
        />
      </label>
      <div style={{ marginTop: 8 }}>
        name in hex: <code>{hex || '(empty)'}</code>
      </div>
      <div style={{ wordBreak: 'break-all' }}>
        unit: <code>{unit || '(empty)'}</code>
      </div>
      <div style={{ color: '#5a5a5a', marginTop: 8 }}>
        An empty asset name is legal, and its hex is empty, so the unit is the policy ID alone.
      </div>
    </div>
  );
}
```

Two consequences worth remembering: the same asset name under two different policies is two different tokens, and an asset name is bytes, not text, so a name that looks like an emoji is just a longer hex string. The unit is what every API takes for `unit` in `assets`.

## 3. The address declares its network

A Shelley address is bech32: a human-readable prefix, a `1` separator, then the data. The prefix says which network and what kind of credential, so you can catch the wrong network before anything is signed.

```jsx live
function AddressInspector() {
  const [addr, setAddr] = React.useState('addr_test1qzlwg5c3mpr0cz5td0rvr5rvcgf02al05cqgd2wzv7pud6chpzk4elx4jh2f7xtftjrdxddr88wg6sfszu8r3gktpjtqrr00q9');
  const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

  // The separator is the first "1"; the bech32 data alphabet has no "1" in it.
  const cut = addr.indexOf('1');
  const hrp = cut > 0 ? addr.slice(0, cut) : '';
  const data = cut > 0 ? addr.slice(cut + 1) : '';
  const first = CHARSET.indexOf(data[0]);
  const type = first >= 0 ? first >> 1 : -1;

  const network = hrp.endsWith('_test')
    ? 'testnet (preview or preprod)'
    : hrp.startsWith('addr') || hrp.startsWith('stake')
      ? 'mainnet'
      : 'unknown';

  const kinds = {
    0: 'base address, key payment credential',
    1: 'base address, script payment credential',
    2: 'base address, key payment credential',
    3: 'base address, script payment credential',
    4: 'pointer address, key payment credential',
    5: 'pointer address, script payment credential',
    6: 'enterprise address, key payment credential',
    7: 'enterprise address, script payment credential',
    14: 'reward (stake) address, key credential',
    15: 'reward (stake) address, script credential',
  };

  const kind = kinds[type] || 'not a Shelley address';
  const looksByron = /^(DdzFF|Ae2|Ae2td)/.test(addr);

  return (
    <div style={{ fontSize: 14, lineHeight: 1.9 }}>
      <label>
        address{' '}
        <input
          value={addr}
          onChange={(e) => setAddr(e.target.value.trim())}
          style={{ width: '100%', maxWidth: 620, padding: '2px 6px', fontFamily: 'monospace' }}
        />
      </label>
      <table style={{ borderCollapse: 'collapse', marginTop: 10, fontSize: 13 }}>
        <tbody>
          <tr>
            <td style={{ paddingRight: 14 }}>prefix</td>
            <td><code>{hrp || '(none)'}</code></td>
          </tr>
          <tr>
            <td style={{ paddingRight: 14 }}>network</td>
            <td style={{ fontWeight: 600 }}>{looksByron ? 'Byron, base58' : network}</td>
          </tr>
          <tr>
            <td style={{ paddingRight: 14 }}>kind</td>
            <td>{looksByron ? 'legacy address, no bech32 prefix' : kind}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ color: '#5a5a5a', marginTop: 10 }}>
        This reads the prefix and the header byte only. It does not verify the checksum.
      </div>
    </div>
  );
}
```

`addr_test1` on mainnet is the mistake to catch, and it costs one string comparison. Sending to `addr1` from a testnet wallet is the same mistake from the other side.

The kinds matter more than they look. An enterprise address (`addr1v…`, `addr1w…`) has no stake credential, so it can hold funds but never earns rewards or votes. A reward address (`stake1…`) is not a payment address and cannot receive ADA. If you build a form, refuse the ones that cannot do the job instead of letting the wallet fail.

That is the shape of an address. Why the two credentials exist at all, and what each one controls, is on the [Addresses](address.md) page.

## Where these numbers come from

Protocol parameters are not constants in the code. `coinsPerUTxOByte`, `minPoolCost`, the slot length and the epoch length are all read from the node or a provider, per network, and they change by governance.

- From a provider: `GET /epochs/latest/parameters` returns `coins_per_utxo_byte`, `min_fee_a`, `min_fee_b` and friends.
- From genesis: the genesis file gives `systemStart`, `slotLength` and `epochLength`, which is how anyone converts a slot number into a wall-clock time.
- Per network: preview, preprod and mainnet disagree. A number copied from a mainnet tutorial will be wrong on preview.

The two that catch people out: fees are `a × size + b`, not a percentage, and a UTxO must hold a minimum amount of ADA that scales with the bytes it occupies, so a token output has to carry a `coinsPerUTxOByte` calculation alongside it.
