<script>
    let {
        id,
        label = null,
        value = $bindable(),
        type = "text",
        placeholder = "",
        feedback = null,
        width = "",
        size = "md",
    } = $props()

    const border = $derived(feedback ? "var(--clr-destructive)" : "var(--clr-gray-300)")

    let height = $derived.by(() => {
        if (size === "lg") {
            return "var(--height-input-lg)"
        } else {
            return "var(--height-input-md)"
        }
    })
</script>


<div>
  {#if label}
    <label for={id}>
      {label}
    </label>
  {/if}
  <input
    id={id}
    bind:value
    placeholder={placeholder}
    style:border-color={border}
    style:height={height}
    type={type}
  >
  <div class="feedback">
    {#if feedback}
    <span id={`${id}-feedback`}>
      {feedback}
    </span>
    {/if}
  </div>
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
    text-align: left;
  }
  input {
    appearance: none;
    font-size: var(--fs-sm);
    color: var(--clr-gray-700);
    padding: 0 .5rem;
    border: 1px solid;
  }
  .feedback {
    height: var(--height-input-feedback-def);
    color: var(--clr-destructive);
  }
  span {
    font-weight: 400;
    font-size: var(--fs-xs);
    color: var(--clr-required);
    padding-top: .5rem;
  }
</style>