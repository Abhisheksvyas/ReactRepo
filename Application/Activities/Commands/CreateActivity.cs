using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command :IRequest<string>
    {
       public required Activity Activity { get; set; }
    }
    public class CommandHandler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Activities.Add(request.Activity);
            var result = await context.SaveChangesAsync(cancellationToken);

            // Logic to create an activity
            return request.Activity.Id.ToString();
        }
    }
}
