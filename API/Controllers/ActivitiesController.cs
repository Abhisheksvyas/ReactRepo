using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController() : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
      //  return await context.Activities.ToListAsync();
      return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        // var activity = await context.Activities.FindAsync(id);

        // if (activity == null) return NotFound();

        // return activity;

        return await Mediator.Send(new GetActivityDetails.Query { Id = id });
    }
    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity([FromBody] Activity activity)
    {
        // context.Activities.Add(activity);
        // await context.SaveChangesAsync();
        // return CreatedAtAction(nameof(GetActivityDetail), new { id = activity.Id }, activity);

        return await Mediator.Send(new CreateActivity.Command { Activity = activity });
    }
    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        // var existingActivity = await context.Activities.FindAsync(id);
        // if (existingActivity == null) return NotFound();
        // existingActivity.Title = activity.Title;
        // await context.SaveChangesAsync();
        // return NoContent();
        await Mediator.Send(new EditActivity.Command { Activity = activity });

        return NoContent( );
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        // var activity = await context.Activities.FindAsync(id);
        // if (activity == null) return NotFound();
        // context.Activities.Remove(activity);
        // await context.SaveChangesAsync();
        // return NoContent();
        await Mediator.Send(new DeleteActivity.Command { Id = id });
        return Ok();
    }
}
