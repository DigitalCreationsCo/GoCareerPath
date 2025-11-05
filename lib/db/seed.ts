import { SAMPLE_DATA } from '@/lib/sample-data';
import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers, reports } from '@/lib/db/schema';
import { hashPassword } from '@/lib/auth/session';

async function createStripeProducts() {
  console.debug('Creating Stripe products and prices...');

  const baseProduct = await stripe.products.create({
    name: 'Base',
    description: 'Base subscription plan',
  });

  await stripe.prices.create({
    product: baseProduct.id,
    unit_amount: 800, // $8 in cents
    currency: 'usd',
    recurring: {
      interval: 'month',
      trial_period_days: 7,
    },
  });

  const plusProduct = await stripe.products.create({
    name: 'Plus',
    description: 'Plus subscription plan',
  });

  await stripe.prices.create({
    product: plusProduct.id,
    unit_amount: 1200, // $12 in cents
    currency: 'usd',
    recurring: {
      interval: 'month',
      trial_period_days: 7,
    },
  });

  console.debug('Stripe products and prices created successfully.');
}

async function seed() {

  console.debug('Seeding database...');
  console.debug('Seeding initial user...');
  
  const email = 'bryantmejia722@outlook.com';
  const password = 'andresadmin234';
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: "owner",
      },
    ])
    .returning();

  console.debug('Initial user created.');

  const [team] = await db
    .insert(teams)
    .values({
      name: 'Admin Team',
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: 'owner',
  });

  console.debug('Seeding reports...');
  await db.insert(reports).values(SAMPLE_DATA);

  console.debug('Seeding Stripe products and prices...');
  await createStripeProducts();
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.debug('Seed process finished. Exiting...');
    process.exit(0);
  });
