<script>
    let {
        id,
        value = $bindable(),
        label = null,
        placeholder = "",
        error = null,
    } = $props()

    const border = $derived(error ? "var(--clr-required)" : "var(--clr-gray-300)")
</script>

<div>
  {#if label}
    <label for={id}>
      {label}
    </label>
  {/if}
  <textarea
    {id}
    {placeholder}
    bind:value={value}
    style:border-color={border}
    wrap="soft"
  ></textarea>
  {#if error}
    <span id={`${id}-error`}>
      {error}
    </span>
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  label {
    font-size: var(--fs-sm);
    color: var(--clr-gray-700);
    font-weight: bold;
    padding-bottom: .5rem;
  }
  textarea {
    appearance: none;
    font-size: var(--fs-base);
    color: var(--clr-gray-700);
    padding: 0.5rem 0.75rem;
    border: 1px solid;
    resize: vertical;
    min-height: 6rem;
    max-height: 24rem;
  }
  span {
    font-weight: 400;
    font-size: var(--fs-xs);
    color: var(--clr-required);
    padding-top: .5rem;
  }
</style>