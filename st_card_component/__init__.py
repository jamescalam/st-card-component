import os
import streamlit.components.v1 as components

parent_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(parent_dir, "frontend/build")
_component_func = components.declare_component(
    "st_card_component",
    path=build_dir
)


# Create a wrapper function for the component. This is an optional
# best practice - we could simply expose the component function returned by
# `declare_component` and call it done. The wrapper allows us to customize
# our component's API: we can pre-process its input args, post-process its
# output value, and add a docstring for users.
def card_component(
    title, context, highlight_start,
    highlight_end, score, url,
    key=None):
    """Create a new instance of "my_component".

    Parameters
    ----------
    title: ...
    context: ...
    highlight_start: ...
    highlight_end: ...
    score: ...
    url: ...
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    HTML component

    """
    # Call through to our private component function. Arguments we pass here
    # will be sent to the frontend, where they'll be available in an "args"
    # dictionary.
    #
    # "default" is a special argument that specifies the initial return
    # value of the component before the user has interacted with it.
    component_value = _component_func(
        title=title,
        context=context,
        highlight_start=highlight_start,
        highlight_end=highlight_end,
        score=score,
        url=url,
        key=key
    )

    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    return component_value
