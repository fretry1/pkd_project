<script>
    let {
        onclick = () => {},
        btype = "",
        variant = "primary",
        form = null,
        width = "fit-content",
        size = "md",
        background = "var(--clr-primary)",
        hover = "var(--clr-primary-hover)",
        color = "var(--clr-white)",
        border = "none",
        margin = "none",
        style = "",
        children
    } = $props()

    let height = $derived.by(() => {
        if (size === "lg") {
            return "var(--height-input-lg)"
        } else {
            return "var(--height-input-md)"
        }
    })
</script>

<button
  class={variant}
  type={btype}
  style:--background={background}
  style:--hover-color={hover}
  style:--button-width={width}
  style:--button-height={height}
  style:--text-color={color}
  style:--border={border}
  style:margin={margin}
  style={style}
  onclick={onclick}
  form={form}
>
  {@render children()}
</button>

<style>
  button {
    padding: 0 1.25rem;
    width: var(--button-width);
    min-width: calc(var(--width-btn-text-min) + var(--paddingx-btn-def));
    height: var(--button-height);
    background: var(--background);
    border: var(--border);
    color: var(--text-color);
    transition: background-color 0.2s ease;
    font-size: var(--fs-sm);
    border-radius: var(--border-radius-sm);

    &:hover {
      background: var(--hover-color);
      cursor: pointer;
    }
  }

  .secondary {
    background-color: var(--clr-secondary);

    &:hover {
      background-color: var(--clr-secondary-hover);
    }
  }

  .destructive {
    background-color: var(--clr-destructive);

    &:hover {
      background-color: var(--clr-destructive-hover);
    }
  }

  .outline {
    background-color: transparent;
    outline: solid 1px var(--clr-gray-200);
    color: var(--clr-text-def);

    &:hover {
      background-color: var(--clr-gray-100);
    }
  }

  .ghost {
    background-color: transparent;
    color: var(--clr-text-def);

    &:hover {
      background-color: var(--clr-gray-100);
    }
  }
</style>