const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'sample-games-simplified.json');
let data = {};

// Load data from file
function loadData() {
  try {
    const fileContent = fs.readFileSync(DATA_PATH, 'utf8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading data:', error);
    // If file doesn't exist or is invalid, initialize with default structure
    data = { games: [], user: { id: 'usr123', username: 'sportsfan42', balance: 1000, predictions: [], stats: { wins: 0, losses: 0, pending: 0 } } };
  }
}

// Save data to file
function saveData() {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// --- Game Simulation and Prediction Processing ---

// Simulate game updates every 5 seconds
function updateGames() {
  let dataChanged = false;
  data.games.forEach(game => {
    const previousStatus = game.status;
    // Simulate progression (very basic)
    if (game.status === 'scheduled') {
        // Optionally transition to inProgress after some time
    }
    else if (game.status === 'inProgress') {
      // Randomly update score
      game.homeTeam.score = (game.homeTeam.score || 0) + Math.floor(Math.random() * 3);
      game.awayTeam.score = (game.awayTeam.score || 0) + Math.floor(Math.random() * 3);

      // Randomly transition to final
      if (Math.random() < 0.1) { // 10% chance to end each interval
          game.status = 'final';
          game.winner = game.homeTeam.score > game.awayTeam.score ? game.homeTeam.abbreviation : game.awayTeam.abbreviation;
      }
      dataChanged = true;
    }

    // Process predictions for finished games
    if (game.status === 'final' && previousStatus !== 'final') {
        console.log(`Game ${game.id} finished. Processing predictions.`);
        data.user.predictions.forEach(prediction => {
            if (prediction.gameId === game.id && prediction.result === 'pending') {
                let predictionResult = 'loss';
                let payout = 0;
                // Determine win/loss based on winner or score comparison for final games
                if (game.winner) {
                    if (prediction.pick === game.winner) {
                        predictionResult = 'win';
                        // Simple payout calculation (e.g., double the amount)
                        payout = prediction.amount * 2;
                    }
                } else { // If no explicit winner field, use score
                    if (prediction.pick === game.homeTeam.abbreviation && game.homeTeam.score > game.awayTeam.score) {
                         predictionResult = 'win';
                         payout = prediction.amount * 2;
                    } else if (prediction.pick === game.awayTeam.abbreviation && game.awayTeam.score > game.homeTeam.score) {
                         predictionResult = 'win';
                         payout = prediction.amount * 2;
                    }
                }

                prediction.result = predictionResult;
                prediction.payout = payout;

                // Update user stats and balance
                if (predictionResult === 'win') {
                    data.user.stats.wins = (data.user.stats.wins || 0) + 1;
                    data.user.balance += payout;
                } else {
                    data.user.stats.losses = (data.user.stats.losses || 0) + 1;
                }
                 data.user.stats.pending = Math.max(0, (data.user.stats.pending || 0) - 1);
                 dataChanged = true;
                 console.log(`Prediction for game ${game.id} (${prediction.pick}, ${prediction.amount}) result: ${predictionResult}, payout: ${payout}`);
            }
        });
    }
  });
  if(dataChanged) {
      saveData(); // Save changes after each update cycle
  }
}

// Initial data load
loadData();

// Start game update simulation
setInterval(updateGames, 5000);

// --- API Endpoints ---

app.get('/games', (req, res) => {
  res.json(data.games);
});

app.get('/user', (req, res) => {
  res.json(data.user);
});

app.post('/predict', (req, res) => {
  const { gameId, pick, amount } = req.body;

  if (!gameId || !pick || amount === undefined || amount <= 0) {
      return res.status(400).json({ error: 'Invalid prediction data.' });
  }

  const game = data.games.find(g => g.id === gameId);
  if (!game || game.status !== 'scheduled') {
       return res.status(400).json({ error: 'Cannot predict on this game.' });
  }

  if (data.user.balance < amount) {
       return res.status(400).json({ error: 'Insufficient balance.' });
  }

  if (data.user.predictions.find(p => p.gameId === gameId)) {
    return res.status(400).json({ error: 'Already predicted for this game.' });
  }

  const prediction = {
    gameId,
    pick,
    amount: Number(amount), // Ensure amount is a number
    result: 'pending'
  };

  data.user.predictions.push(prediction);
  data.user.balance -= prediction.amount;
  data.user.stats.pending = (data.user.stats.pending || 0) + 1;

  saveData(); // Save data after a prediction

  res.json({ success: true, prediction });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Mock API running on port ${PORT}`)); 