# Filters

Filters in `cktool` are specified as individual strings in the following format:

```
FIELD_NAME FILTER_TYPE FILTER_VALUE
```

In the example filter `"latteCost > 4.60"`, the `FIELD_NAME` is `latteCost`, `FILTER_TYPE`  is greater-than, and `FILTER_VALUE` is a double value of `4.6`. For this filter to work, the record type being filtered must have a `latteCost` field with a double type.

How `FILTER_VALUE` type is inferred dynamically (and how you can be explicit about a given type) is outlined below in [Dynamic Fields](#dynamic-fields).

### Filter Types

The following filter types are supported, and additional short-hand while parsing is in parentheses:

> EQUALS (`==`)

> NOT_EQUALS (`!=`)

> LESS_THAN (`<`)

> LESS_THAN_OR_EQUALS (`<=`)

> GREATER_THAN (`>`)

> GREATER_THAN_OR_EQUALS (`>=`)

> NEAR

> CONTAINS_ALL_TOKENS

> CONTAINS_ANY_TOKENS

> LIST_CONTAINS_ANY

> LIST_NOT_CONTAINS_ANY

### Dynamic Fields

When specifying filters, to make the syntax simpler, `cktool` uses two main ways to infer the underlying field type.

#### Implicit/Do-What-I-Mean Typing

By just passing a value, `cktool` does its best to guess what underlying CloudKit type is meant and tries to parse it, until finally falling back to `stringType` if nothing can be resolved.

For example, the `4.60` in `latteCost > 4.60` becomes a `doubleType` automatically. The following set of examples best illustrates how the DWIM parsing works:

> `6.123` -> `{"type": "doubleType", "value": 6.123}`

> `123` -> `{"type": "int64Type", "value": 123}`

> `2021-01-01` -> `{"type": "timestampType", "value": "2021-01-01T00:00:00+0400"}` (timezone is local)

> `40.712772,-74.006058` -> `{"type": "locationType", "value": {"latitude": 40.712772, "longitude": -74.006058}}`

#### Explicit Typing

You can specify the type directly with the following format:

```
CLOUDKIT_TYPE:VALUE
```

e.g. `stringType:2021-01-01` will result in a dynamic field with eventual JSON: `{"type": "stringType", "value": "2021-01-01"}`
