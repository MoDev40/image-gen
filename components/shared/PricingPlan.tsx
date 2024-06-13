"use client"
import { plans } from '@/constants';
import { Button } from '../ui/button';

function PricingPlan() {
  return (
    <div className="container mx-auto px-4 py-8">
    <div className="grid md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div key={plan._id} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <img src={plan.icon} alt={plan.name} className="w-16 h-16 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
          <p className="text-gray-500 mb-4">${plan.price}/month</p>
          <p className="text-gray-700 font-semibold mb-4">{plan.credits} Credits</p>
          <ul className="mb-6">
            {plan.inclusions.map((inclusion, index) => (
              <li key={index} className={`${inclusion.isIncluded ? 'text-green-500' : 'text-gray-400'} flex items-center`}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  {inclusion.isIncluded
                    ? <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    : <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-10.5a.75.75 0 10-1.5 0v3H7.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-3v-3z" clipRule="evenodd"></path>}
                </svg>
                {inclusion.label}
              </li>
            ))}
          </ul>
          <Button className="transition">Choose Plan</Button>
        </div>
      ))}
    </div>
  </div>
);
};

export default PricingPlan