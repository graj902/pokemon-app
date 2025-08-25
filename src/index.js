import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "antd/dist/reset.css";
import { List, Card, Spin, Typography, Layout, Input } from "antd";

const { Title } = Typography;
const { Header, Content } = Layout;

// Thunk to fetch Pokemons
const fetchPokemons = createAsyncThunk("pokemon/fetchPokemons", async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
  const results = await Promise.all(
    response.data.results.map(async (p) => {
      const details = await axios.get(p.url);
      return {
        name: p.name,
        image: details.data.sprites.front_default,
      };
    })
  );
  return results;
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: { list: [], loading: false, filter: "" },
  reducers: {
    setFilter: (state, action) => { state.filter = action.payload.toLowerCase(); }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => { state.loading = true; })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state) => { state.loading = false; });
  },
});
const { setFilter } = pokemonSlice.actions;

const store = configureStore({ reducer: { pokemon: pokemonSlice.reducer } });

const PokemonList = () => {
  const dispatch = useDispatch();
  const { list, loading, filter } = useSelector((s) => s.pokemon);

  useEffect(() => { dispatch(fetchPokemons()); }, [dispatch]);

  if (loading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;

  const filtered = list.filter(p => p.name.includes(filter));

  return (
    <>
      <Input.Search
        placeholder="Search Pokémon"
        onChange={(e) => dispatch(setFilter(e.target.value))}
        style={{ maxWidth: 360, marginBottom: 16 }}
        allowClear
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={filtered}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.name} hoverable>
              {item.image ? (
                <img src={item.image} alt={item.name} style={{ width: 96, height: 96 }} />
              ) : (
                <div style={{ height: 96, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  No image
                </div>
              )}
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

const App = () => (
  <Layout style={{ minHeight: "100vh", background: "#fff" }}>
    <Header style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
      <Title level={3} style={{ margin: 0 }}>Pokémon Gallery</Title>
    </Header>
    <Content style={{ padding: 24 }}>
      <PokemonList />
    </Content>
  </Layout>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Provider store={store}><App /></Provider>);
