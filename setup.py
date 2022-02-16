import setuptools

setuptools.setup(
    name="st_card_component",
    version="0.0.10",
    author="James Briggs",
    author_email="",
    description="Card component for Streamlit",
    long_description="Card component for Streamlit",
    long_description_content_type="text/plain",
    url="",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.63",
    ],
)
